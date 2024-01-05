import { WalineAbort } from '@waline/client';

declare const updatePageview: () => Promise<WalineAbort | void>;

export { updatePageview };
