'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ここにログイン処理を追加
    console.log('ログイン試行:', email, password);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {/* フォームの内容はそのまま */}
    </form>
  );
}
