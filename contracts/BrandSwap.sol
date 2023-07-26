// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControlDefaultAdminRules.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BrandSwap is ERC721Enumerable, ERC721Burnable, ERC721Pausable, ERC721URIStorage, AccessControlDefaultAdminRules{

    /// @dev counter for NFT tokenId
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /// @dev role for minter and burner
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    /// @dev record which tokenId is paused
    mapping(uint256 => bool) private _pausedTokens;

    /// @dev Record who set what URI to which tokenId when setting URI
    event nftMinted(address indexed sender, uint256 indexed tokenId, string uri);

    constructor()
    AccessControlDefaultAdminRules(3 days, _msgSender())
    ERC721("BrandSwap", "BS")
    {
        _grantRole(MINTER_ROLE, _msgSender());
        _grantRole(BURNER_ROLE, _msgSender());
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
     * @dev Only addresses set as administrators to this contract can be minted
     * @param uri string can not unchanged
     *
     * emit TokenURIChanged
     */
    function nftMint(string calldata uri) external onlyRole(MINTER_ROLE) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(owner(), newTokenId);
        _setTokenURI(newTokenId, uri);

        emit nftMinted(owner(), newTokenId, uri);
    }

    /**
     * @dev settings for URI prefix
     */
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    /**
     * @dev pause NFTs
     */
    function pause() public onlyRole(DEFAULT_ADMIN_ROLE)  {
        _pause();
    }

    /**
     * @dev unpause NFTs
     */
    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE)  {
        _unpause();
    }

    function pauseToken(uint256 tokenId) public {
        // チェック：呼び出し元がトークンの所有者であること
        require(_isApprovedOrOwner(_msgSender(), tokenId), "Caller is not owner nor approved");
        _pausedTokens[tokenId] = true;
    }

    function unpauseToken(uint256 tokenId) public {
        // チェック：呼び出し元がトークンの所有者であること
        require(_isApprovedOrOwner(_msgSender(), tokenId), "Caller is not owner nor approved");
        _pausedTokens[tokenId] = false;
    }

    /**
     * @dev overrides
     */
    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable, ERC721URIStorage, AccessControlDefaultAdminRules)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev overrides
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        require(!_pausedTokens[tokenId], "ERC721Pausable: token transfer while paused");
    }

    /**
     * @dev overrides
     */
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev NFT can be burned by owner or burner
     */
    function burn(uint256 tokenId) public override {
        require(hasRole(BURNER_ROLE, _msgSender()), "BrandSwap: must have burner role to burn");
        _burn(tokenId);
    }

    /**
     * @dev overrides
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

}