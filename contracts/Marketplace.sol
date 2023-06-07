// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControlDefaultAdminRules.sol";

contract Marketplace is Context, ReentrancyGuard, AccessControlDefaultAdminRules {
    ERC721 private _nft;

    bytes32 public constant SET_SALE_ROLE = keccak256("SET_SALE_ROLE");

    struct Sale {
        address seller;
        uint256 price;
        bool isSale;
    }

    mapping(uint256 => Sale) private _sales;

    constructor(address nftAddress, address adminAddress)
    AccessControlDefaultAdminRules(3 days, adminAddress) {
        _nft = ERC721(nftAddress);
        _grantRole(SET_SALE_ROLE, adminAddress);
    }

    function setSale(uint256 tokenId, uint256 price, bool isSale) public onlyRole(SET_SALE_ROLE) {
        require(_nft.ownerOf(tokenId) == _msgSender(), "Not token owner");
        _sales[tokenId] = Sale(_msgSender(), price, isSale);
    }

    function buy(uint256 tokenId, IERC20 tokenAddress) public payable nonReentrant {
        // Ensure that tokenAddress is a valid ERC20
        require(tokenAddress.totalSupply() > 0, "Invalid ERC20 token");

        Sale storage sale = _sales[tokenId];

        // Ensure the NFT is up for sale
        require(sale.isSale, "NFT is not for sale");

        // Check buyer balance
        require(tokenAddress.balanceOf(_msgSender()) >= sale.price, "Insufficient balance");

        // First, transfer the NFT to ensure it's possible
        _nft.transferFrom(sale.seller, _msgSender(), tokenId);

        // Then, transfer the ERC20 token from buyer to seller
        tokenAddress.transferFrom(_msgSender(), sale.seller, sale.price);

        // Delete the sale
        delete _sales[tokenId];
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
