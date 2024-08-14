class SaveUserData {
  constructor(private cacheName: string) { }

  private verifyIfCacheNameExist() {
    if (this.cacheName !== 'token' && this.cacheName !==
      'name' && this.cacheName !== 'role') return false;
    else return true;
  }

  async saveData(data: string) {
    try {
      if (this.verifyIfCacheNameExist()) {
        const cache = await caches.open(this.cacheName);
        await cache.put(this.cacheName, new Response(data));
        return 'Successfully saved'
      }
    } catch (e) {
      return 'Erro to save'
    }
  }

  async getData() {
    try {
      if (this.verifyIfCacheNameExist()) {
        const cache = await caches.open(this.cacheName);
        const response = await cache.match(this.cacheName);
        if (response) {
          const token = await response.text();
          return token;
        } else {
          return 'Data does not exist';
        }
      }
    } catch (error) {
      return 'Internal server erro';
    }
  }

}

export default SaveUserData;
