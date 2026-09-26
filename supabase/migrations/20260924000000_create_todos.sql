-- Create todos table
create table todos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade
);

-- Enable Row Level Security
alter table todos enable row level security;

-- Policy: users can only see their own todos
create policy "Users can view their own todos"
  on todos for select
  using (auth.uid() = user_id);

-- Policy: users can only insert their own todos
create policy "Users can insert their own todos"
  on todos for insert
  with check (auth.uid() = user_id);

-- Policy: users can only update their own todos
create policy "Users can update their own todos"
  on todos for update
  using (auth.uid() = user_id);

-- Policy: users can only delete their own todos
create policy "Users can delete their own todos"
  on todos for delete
  using (auth.uid() = user_id);
