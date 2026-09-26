-- Seed data for development

-- 開発用の仮ユーザーを auth.users に挿入
insert into auth.users (id, email, created_at, updated_at)
values ('a0000000-0000-0000-0000-000000000001', 'dev@example.com', now(), now())
on conflict do nothing;

-- RLS を一時的に無効化
alter table todos disable row level security;

-- 開発用の仮ユーザーUUID
do $$
declare
  dev_user_id uuid := 'a0000000-0000-0000-0000-000000000001';
begin
  insert into todos (title, completed, user_id, created_at) values
    ('スーパーで買い物をする',        false, dev_user_id, now() - interval '5 days'),
    ('Next.jsのドキュメントを読む',   true,  dev_user_id, now() - interval '4 days'),
    ('Supabaseのマイグレーションを確認する', true, dev_user_id, now() - interval '3 days'),
    ('プロジェクトのREADMEを更新する', false, dev_user_id, now() - interval '2 days'),
    ('デプロイ手順をまとめる',         false, dev_user_id, now() - interval '1 day');
end $$;

-- RLS を再度有効化
alter table todos enable row level security;
