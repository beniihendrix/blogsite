create table "public"."posts" (
  "id" uuid not null,
  "title" text not null,
  "body" text not null,
  "created_at" timestamp with time zone default now(),
  "author" uuid not null
);

CREATE UNIQUE INDEX posts_pkey ON public.posts USING btree (id);

alter table "public"."posts" add constraint "posts_pkey" PRIMARY KEY using index "posts_pkey";
alter table "public"."posts" add constraint "posts_author_fkey" FOREIGN KEY (author) REFERENCES auth.users(id) not valid;
alter table "public"."posts" validate constraint "posts_author_fkey";
