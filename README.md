# Supabase Calendar

## Setup

1. เปิด Supabase Project & รัน SQL:
   ```sql
   create extension if not exists "uuid-ossp";
   create table events ( ... );
   alter table events enable row level security;
   create policy "..." on events for all ...;
