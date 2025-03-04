import {wDelete, wPost} from '../util/request.util.js';

export async function deleteKey(id) {
  return wDelete('/v1/partner/api-key/' + id);
}

export async function createKey(name) {
  return wPost('/v1/partner/api-key', {name});
}