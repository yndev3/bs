<?php declare(strict_types=1);

namespace app\Http\Api;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\AuthManager;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use kornrunner\Keccak;
use Pelieth\LaravelEcrecover\EthSigRecover;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Illuminate\Support\Facades\Log;
final class AuthController
{

    public function __construct(
        private readonly User $user,
        private readonly AuthManager $auth,
    ) {
    }

    public function getStatement(Request $request): JsonResponse
    {
        $request->session()->put('nonce', $nonce = Str::random());

        return response()->json([
            'statement' => 'Sign in with Ethereum to the app.',
            'nonce' => $nonce,
            'issuedAt' => now()->toIso8601String() // ISO 8601 datetime string
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        try {
            $this->checkSignature($request);
        } catch (ValidationException $e) {
            Log::info($e->getMessage());
            return new JsonResponse([
                'message' => $e->getMessage(),
                ResponseAlias::HTTP_BAD_REQUEST
            ]);
        }

        $user = $this->user->firstOrCreate(['address' => strtolower($request->input('address'))]);

        if (!$user) {
            return new JsonResponse([
                'User registration failed',
                ResponseAlias::HTTP_BAD_REQUEST
            ]);
        }
        Auth::login($user, true);
        return new JsonResponse([
            'status' => 'success',
            'message' => 'User registration completed',
        ], ResponseAlias::HTTP_CREATED);
    }
    
    /**
     * @throws AuthenticationException
     */
    public function logout(Request $request): JsonResponse
    {
        if ($this->auth->guard()->guest()) {
            return new JsonResponse([
                'message' => 'Already Unauthenticated.',
            ]);
        }

        $this->auth->guard()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return new JsonResponse([
            'message' => 'Unauthenticated.',
        ]);
    }


    /**
     * @throws ValidationException
     */
    private function checkSignature(Request $request): void
    {
        $address = $request->input('address');
        $signature = $request->input('signature');
        $message = $request->input('message');
        $iso8601String = $request->input('issuedAt');
        $reqNonce = $request->input('nonce');

        $nonce = $request->session()->pull('nonce');

        // Check if address is a valid Ethereum address
        if (!$this->isChecksumAddress($address)) {
            throw ValidationException::withMessages(['signature' => 'Invalid request. Please try again.'. __LINE__]);
        }

        // Check if nonce is present in the session
        if (!$nonce && $nonce !== $reqNonce) {
            throw ValidationException::withMessages(['signature' => 'Invalid request. Please try again.'. __LINE__]);
        }

        $dateTime = Carbon::parse($iso8601String);
        // Check if the issuedAt timestamp is within the last 5 minutes
        $isWithinFiveMinutes = $dateTime->gt(Carbon::now()->subMinutes(5)) && $dateTime->lte(Carbon::now());
        if (!$isWithinFiveMinutes) {
            throw ValidationException::withMessages(['signature' => 'Invalid request. Please try again.'. __LINE__]);
        }

        if (!$this->verifySignature($message, $signature, $address)) {
            throw ValidationException::withMessages(['signature' => 'Invalid request. Please try again.'. __LINE__]);
        }
    }

    private function verifySignature($message, $signature, $address): bool
    {
        $web3 = new EthSigRecover();
        $result = $web3->personal_ecRecover($message, $signature);
        return strtolower($address) === strtolower($result);
    }

    function isChecksumAddress(string $address): bool {
        if (strlen($address) !== 42) {
            return false;
        }

        $addressWithoutPrefix = substr($address, 2);
        $addressHash = Keccak::hash(strtolower($addressWithoutPrefix), 256);

        for ($i = 0; $i < 40; $i++) {
            $char = $addressWithoutPrefix[$i];
            if ((intval($addressHash[$i], 16) >= 8 && $char !== strtoupper($char)) ||
                (intval($addressHash[$i], 16) < 8 && $char !== strtolower($char))) {
                return false;
            }
        }

        return true;
    }

    public function isAdmin(Request $request, string $address): JsonResponse
    {
        try {
            $user = $this->user->where('address', strtolower($address))->firstOrFail();
            return response()->json([
                'isAdmin' => strtolower($user->role) === 'admin',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'User not found。'
            ], 404);
        }
    }

}