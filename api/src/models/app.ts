import { Model } from '@mohism/core';

export default Model('app', {
  name: { type: String, required: true },
  url: { type: String, default: 'http://' },
});