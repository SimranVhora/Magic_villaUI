import { Injectable } from '@angular/core';
import {  LocalStorageType } from './local-storage.enum';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static encryptionKey: string = 'fV72eQGcLKBtK1RXMI0JZ3IMJIwpQTP6O6i9rx4JxqZ';
  constructor() { }

  /**
   * Get the storage facility
   * @param storageType {LocalStorageTypes}
   * @private
   * @returns {localStorage|sessionStorage}
   */
  private static _getStorage(storageType:LocalStorageType){
    return storageType === LocalStorageType.LOCAL ?
    localStorage :
    sessionStorage;
  }

  static setItem(storageType:LocalStorageType,key:string,value:any){
    const storage = LocalStorageService._getStorage(storageType);
    const val = JSON.stringify(value);
    const encyptionVal=  CryptoJS.AES.encrypt(
      val,
      LocalStorageService.encryptionKey,
    ).toString();
    storage.setItem(`${key}`,encyptionVal);
  }

  /**
   * Get a localStorage or sessionStorage item value
   * @param storageType {'local'|'session'}
   * @param key {string}
   */
  static getItem(storageType: LocalStorageType, key: string) {
    const storage = LocalStorageService._getStorage(storageType);
    const val = storage.getItem(`${key}`) ?? '';
    const decryptedData =CryptoJS.AES.decrypt(
      val,
      LocalStorageService.encryptionKey
    ).toString(CryptoJS.enc.Utf8);
    try {
      return JSON.parse(decryptedData);
    } catch (e) {
      return decryptedData;
    }
  }
  /**
   * Remove an item from localStorage or sessionStorage
   * @param storageType {LocalStorageTypes}
   * @param key {string}
   */
  static removeItem(storageType: LocalStorageType, key: string) {
    const storage = LocalStorageService._getStorage(storageType);
    storage.removeItem(`${key}`);
  }
}
