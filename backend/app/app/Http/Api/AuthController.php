<?php declare(strict_types=1);

namespace app\Http\Api;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Pelieth\LaravelEcrecover\EthSigRecover;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

final class AuthController
{

    public function __construct(
        private readonly User $user,
        private readonly AuthManager $auth,
    ) {
    }


    public function register(Request $request): JsonResponse
    {
        $this->checkSignature($request);

        $user = $this->user->firstOrCreate(['address' => strtolower($request->input('address'))]);

        if (!$user) {
            return new JsonResponse([
                'User registration failed',
                ResponseAlias::HTTP_BAD_REQUEST
            ]);
        }
        Auth::login($user);
        return new JsonResponse([
            'User registration completed',
            ResponseAlias::HTTP_OK
        ]);
    }
    
    /**
     * @throws AuthenticationException
     */
    public function login(Request $request): JsonResponse
    {
        $this->checkSignature($request);
        $address = $request->input('address');

        if ($this->auth->guard()->attempt(['address' => strtolower($address)])) {
//            Auth::login($user);
            $request->session()->regenerate();

            return new JsonResponse([
                'message' => 'Authenticated.',
            ]);
        }
        throw new AuthenticationException();
    }


    /**
     * @throws ValidationException
     */
    private function checkSignature(Request $request): void
    {
        $address = $request->input('address');
        $signature = $request->input('signature');
        $message = $request->input('message');

        $web3 = new EthSigRecover();
        $result = $web3->personal_ecRecover($message, $signature);

        if (strtolower($address) !== strtolower($result)) {
            throw ValidationException::withMessages(['signature' => 'Signature verification failed.']);
        }
    }

}