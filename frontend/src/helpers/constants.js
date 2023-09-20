import SellingABI from '../contracts/Selling.json';
import BrandSwapABI from '../contracts/BrandSwap.json';
import ERC20ABI from '../contracts/erc20.abi.json';

export const SELLING_ABI = SellingABI.abi;
export const BRAND_SWAP_ABI = BrandSwapABI.abi;
export const ERC20_ABI = ERC20ABI;
export const BRAND_SWAP_CONTRACT = process.env.REACT_APP_BRANDSWAP_ADDRESS;
export const SELLING_CONTRACT = process.env.REACT_APP_SELLING_ADDRESS;
export const ERC_20_TOKEN_CONTRACT = process.env.REACT_APP_ERC20_ADDRESS;
export const OWNER_ADDRESS = process.env.REACT_APP_BRANDSWAP_MINT_ADDRESS;
export const POLYGON_SCAN_ADDRESS = process.env.REACT_APP_POLYGON_SCAN_ADDRESS;