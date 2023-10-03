<?php declare(strict_types=1);

namespace App\Http\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

final class ItemRegistrationController
{

    public function __construct(private readonly Product $product)
    {
    }

    public function __invoke(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            DB::beginTransaction();
            $tokenId = $request->input('tokenId');

            $owner = strtolower($request->input('owner'));
            $uri = $request->input('uri');
            $metaUrl = $this->convertIpfsLink($uri);
            $response = Http::get($metaUrl);
            $metaData = $response->object();
            $metaData->imageList = json_encode(Arr::map($metaData->imageList, function ($value) {
                return $this->convertIpfsLink($value);
            }));

            $product = $this->product->productCreate($owner, $tokenId, $metaData, $metaUrl);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error(__FILE__.':'. __LINE__.'=>', ['error' => $e->getMessage()]);
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'success',
            'data' => $product
        ]);
    }

    private function convertIpfsLink($ipfsLink): string
    {
        $baseUrl = "https://w3s.link/ipfs/";
        return str_starts_with($ipfsLink, "ipfs://")
            ? preg_replace('/^ipfs:\/\//', $baseUrl, $ipfsLink)
            : $baseUrl.$ipfsLink;
    }

}