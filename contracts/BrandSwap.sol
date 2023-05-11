// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts@4.8.3/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.3/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.8.3/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@4.8.3/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts@4.8.3/access/AccessControl.sol";
import "@openzeppelin/contracts@4.8.3/access/Ownable.sol";
import "@openzeppelin/contracts@4.8.3/utils/Counters.sol";
import "@openzeppelin/contracts@4.8.3/utils/Strings.sol";

contract BrandSwap is ERC721Pausable, ERC721Burnable, ERC721URIStorage, AccessControl, Ownable {

    /**
     * @dev counter for NFT tokenId
     */
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /**
     * @dev Record who set what URI to which tokenId when setting URI
     */
    event TokenURIChanged(address indexed sender, uint256 indexed tokenId, string uri);

    constructor() ERC721("BrandSwap", "BS") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * @dev Grant administrative privileges to an account
     * emit RoleGranted(role, account, _msgSender())
     */
    function grantAdminRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    /**
     * [WIP] can revoke self.
     *
     * @dev Revoke administrative privileges
     * emit RoleRevoked(role, account, _msgSender())
     */
    function revokeAdmin(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        return super.renounceRole(DEFAULT_ADMIN_ROLE, account);
    }

    /**
     * @dev return ture if account has admin role
     */
    function isAdmin(address account) public view returns (bool) {
        return super.hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    /**
     * @dev Only addresses set as administrators to this contract can be minted
     *
     * emit TokenURIChanged
     */
    function nftMint() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(_msgSender(), newTokenId);
        // string memory jsonFile = string(abi.encodePacked('metadata', Strings.toString(newTokenId), '.json'));
        string memory jsonFile = "testnote";
        _setTokenURI(newTokenId, jsonFile);

        emit TokenURIChanged(_msgSender(), newTokenId, jsonFile);
    }

    /**
     * @dev settings for URI prefix
     */
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://aaa/";
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

    /**
     * @dev overrides
     */
    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, AccessControl)
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
    ) internal override(ERC721, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @dev overrides
     */
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev overrides
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

}