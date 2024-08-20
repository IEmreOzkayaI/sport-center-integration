import React from 'react';

import { XCircleIcon } from 'lucide-react';

export default function UserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <XCircleIcon className="w-16 h-16 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold">Henüz bir kullanıcı bulunamadı.</h2>
      <p className="mt-2 text-sm text-muted-foreground">Aradığınız kullanıcıyı bulamadık.</p>
    </div>
  );
}
