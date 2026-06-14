/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { useEffect, useState } from 'react';

/**
 * True on devices with a precise, hover-capable pointer (desktop/laptop with a
 * mouse). False on touch devices, where `:hover` / `whileHover` never fire — use
 * this to drive tap- or scroll-triggered equivalents instead.
 *
 * Defaults to `true` so the desktop experience renders correctly before the
 * effect runs (client-only app, no SSR flash to worry about).
 */
export function useHasHover(): boolean {
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setHasHover(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return hasHover;
}
