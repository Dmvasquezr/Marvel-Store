export default class MarvelService {
  constructor() {
    this.apiUrl = "https://gateway.marvel.com:443/v1/public/";
    this._publicKey = "42962e021295192a1b2f967bc23fb720";
    this._privateKey = "4965ad5cf3bfa25accc27189e26f5031228a30cf";
    (this._ts = 1000), //new Date().getTime();
      (this._hash = `9b8582b7dc41c1b7d133fda568e8e049`);
  }

  /**
   * @param {number} offset
   * @param {limit} limit
   */
  async getCharacters(offset, limit) {
    const response = await fetch(
      `${this.apiUrl}characters?offset=${offset}&limit=${limit}&ts=${this._ts}&apikey=${this._publicKey}&hash=${this._hash}`
    );

    const data = await response.json();

    return data.data.results;
  }

  /**
   * @param {number} offset
   * @param {limit} limit
   */
  async getComics(offset, limit) {
    const response = await fetch(
      `${this.apiUrl}comics?offset=${offset}&limit=${limit}&ts=${this._ts}&apikey=${this._publicKey}&hash=${this._hash}`
    );

    const data = await response.json();

    return data.data.results;
  }
}
