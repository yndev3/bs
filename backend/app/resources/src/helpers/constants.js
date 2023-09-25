import SellingABI from '../contracts/Selling.json';
import BrandSwapABI from '../contracts/BrandSwap.json';
import ERC20ABI from '../contracts/erc20.abi.json';

export const SELLING_ABI = SellingABI.abi;
export const BRAND_SWAP_ABI = BrandSwapABI.abi;
export const ERC20_ABI = ERC20ABI;
export const BRAND_SWAP_CONTRACT = import.meta.env.VITE_BRANDSWAP_ADDRESS;
export const SELLING_CONTRACT = import.meta.env.VITE_SELLING_ADDRESS;
export const ERC_20_TOKEN_CONTRACT = import.meta.env.VITE_ERC20_ADDRESS;
export const OWNER_ADDRESS = import.meta.env.VITE_BRANDSWAP_MINT_ADDRESS;
export const POLYGON_SCAN_ADDRESS = import.meta.env.VITE_POLYGON_SCAN_ADDRESS;