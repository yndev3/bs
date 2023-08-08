<?php declare(strict_types=1);

namespace App\Http\Api;

use App\Models\JewelryOption;
use App\Models\MaterialOption;
use App\Models\Product;
use App\Models\WatchOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

readonly class ItemRegistrationController
{

    public function __construct(private Product $product)
    {
    }

    public function __invoke(Request $request): \Illuminate\Http\JsonResponse
    {
        // todo 管理者認証
        try {
            DB::beginTransaction();
            if (!$request->isMethod('post')) {
                throw new \Exception('Method not allowed');
            }

            $tokenId = $request->tokenId;
            $metaUrl = $this->convertIpfsLink($request->uri);
            $response = Http::get($metaUrl);
            $metaData = $response->object();

            $product = $this->product->productCreate($tokenId , $metaData);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'error',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'success',
            'data' => $metaData->option
        ]);
    }

    private function convertIpfsLink($ipfsLink): string
    {
        $baseUrl = "https://w3s.link/ipfs/";
        return preg_replace('/^ipfs:\/\//', $baseUrl, $ipfsLink);
    }

}