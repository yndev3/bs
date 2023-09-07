// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControlDefaultAdminRules.sol";
import "./BrandSwap.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";
contract Marketplace is Context, ReentrancyGuard, AccessControlDefaultAdminRules {
    bytes32 public constant SET_SALE_ROLE = keccak256("SET_SALE_ROLE");

    BrandSwap private _nft;
    /// @dev ERC20 token used for payment
    address private  _tokenContract;
    address private  _adminAddress;

    struct Sale {
        uint256 tokenId;
        uint256 price;
        bool isSale;
    }

    mapping(uint256 => Sale) private _sales;

    event TokenSold(uint256 indexed tokenId, address newOwner, uint256 price, IERC20 token);
    event changeSaleState(uint256 indexed tokenId, address excutor, uint256 price, bool isSale);

    constructor(address nftAddress, address adminAddress)
    AccessControlDefaultAdminRules(3 days, adminAddress) {
        _nft = BrandSwap(nftAddress);
        _grantRole(SET_SALE_ROLE, adminAddress);
        _adminAddress = adminAddress;
    }

    /**
    * @dev setting for nft selling price
    */
    function setSale(uint256 tokenId, uint256 price, bool isSale) external onlyRole(SET_SALE_ROLE) {
        _sales[tokenId] = Sale(tokenId, price, isSale);
        emit changeSaleState(tokenId, _msgSender(), price, isSale);
    }

    function getSale(uint256 tokenId) external view returns (Sale memory) {
        return _sales[tokenId];
    }

    function setTokenContract(address tokenContract) external onlyRole(SET_SALE_ROLE) {
        _tokenContract = tokenContract;
    }

    function getTokenContract() external view returns (address) {
        return _tokenContract;
    }

    /**
    * @dev buy nft with ERC20 token
    */
    function buyWithERC20(uint256 tokenId, uint256 payment, IERC20 token) external {
        Sale memory sale = _sales[tokenId];
        require(sale.isSale, "Marketplace: The token is not for sale");
        require(_tokenContract == address(token), "Marketplace: The token is not for sale for this ERC20 token");
        require(token.balanceOf(msg.sender) >= sale.price, "Marketplace: Insufficient balance");
        require(payment == sale.price, "Marketplace: Please submit the asking price in order to complete the purchase");

        // transfer the ERC20 token to the seller
        require(
            token.transferFrom(msg.sender, _adminAddress, payment),
            "Marketplace: Transfer of payment token failed"
        );

        // transfer the NFT token to the buyer
        _nft.safeTransferFrom(_adminAddress, msg.sender, tokenId);

        // remove the token from sale
        delete _sales[tokenId];

        emit TokenSold(tokenId, msg.sender, payment, token);
    }

    /**
    * @dev override
    * AccessControlDefaultAdminRules.owner() returns address(0)
    * if DEFAULT_ADMIN_ROLE is not set
    */
    function owner() public view override returns (address) {
        return super.owner();
    }

    /**
     * @dev overrides
     */
    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(AccessControlDefaultAdminRules)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
