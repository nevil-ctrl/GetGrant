--
-- PostgreSQL database dump
--

\restrict mx55cE2c0zcEZ8t3DOaWATm65M5L9VmFCgxMIrl37zbSL1ogJ0isCoV72Ukg8xL

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cache; Type: TABLE; Schema: public; Owner: getgrant_user
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO getgrant_user;

--
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: getgrant_user
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO getgrant_user;

--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: getgrant_user
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO getgrant_user;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: getgrant_user
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failed_jobs_id_seq OWNER TO getgrant_user;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: getgrant_user
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: job_batches; Type: TABLE; Schema: public; Owner: getgrant_user
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


ALTER TABLE public.job_batches OWNER TO getgrant_user;

--
-- Name: jobs; Type: TABLE; Schema: public; Owner: getgrant_user
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO getgrant_user;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: getgrant_user
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jobs_id_seq OWNER TO getgrant_user;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: getgrant_user
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: getgrant_user
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO getgrant_user;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: getgrant_user
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO getgrant_user;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: getgrant_user
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: getgrant_user
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_reset_tokens OWNER TO getgrant_user;

--
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: getgrant_user
--

CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name text NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.personal_access_tokens OWNER TO getgrant_user;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: getgrant_user
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_access_tokens_id_seq OWNER TO getgrant_user;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: getgrant_user
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: getgrant_user
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO getgrant_user;

--
-- Name: users; Type: TABLE; Schema: public; Owner: getgrant_user
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    two_factor_secret text,
    two_factor_recovery_codes text,
    two_factor_confirmed_at timestamp(0) without time zone
);


ALTER TABLE public.users OWNER TO getgrant_user;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: getgrant_user
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO getgrant_user;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: getgrant_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: getgrant_user
--

COPY public.cache (key, value, expiration) FROM stdin;
\.


--
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: getgrant_user
--

COPY public.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: getgrant_user
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: getgrant_user
--

COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: getgrant_user
--

COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: getgrant_user
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2025_11_20_093225_create_personal_access_tokens_table	1
5	2025_11_20_093437_add_two_factor_columns_to_users_table	1
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: getgrant_user
--

COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: getgrant_user
--

COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: getgrant_user
--

COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
sG3PYrKgIYlA3MfHUG2Op0ylyGGTcUGUk5ZvQnRq	\N	127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	YTozOntzOjY6Il90b2tlbiI7czo0MDoiSU1uNlg3OHBjZTFFSWJDZ1JmZzc3ekNyVGhrSFBCbThCVDBMU1lSbSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==	1763638230
BsAA5swV1N3Vo6xbutZ56sLG6c7ahJhUsesLeZya	\N	127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	YTozOntzOjY6Il90b2tlbiI7czo0MDoiUEpsOWZLOXZYWkdYS3FnaFJWb0xsUnd1SFNlak9RUUlVWVVYMGY5SiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==	1763657222
H3gCVFukxgYw9pgzqbZLDAGqjfeFvBYcK1xcso64	\N	127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	YTozOntzOjY6Il90b2tlbiI7czo0MDoiQWc0SzExUWNJOWQwcjJBOWp5V1lLTWRtNDF5Rkk0Q3QzbWt1NWtyTSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==	1763710392
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: getgrant_user
--

COPY public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, two_factor_secret, two_factor_recovery_codes, two_factor_confirmed_at) FROM stdin;
\.


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: getgrant_user
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: getgrant_user
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: getgrant_user
--

SELECT pg_catalog.setval('public.migrations_id_seq', 5, true);


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: getgrant_user
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: getgrant_user
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: getgrant_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: getgrant_user
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- Name: personal_access_tokens_expires_at_index; Type: INDEX; Schema: public; Owner: getgrant_user
--

CREATE INDEX personal_access_tokens_expires_at_index ON public.personal_access_tokens USING btree (expires_at);


--
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: getgrant_user
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: getgrant_user
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: getgrant_user
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- PostgreSQL database dump complete
--

\unrestrict mx55cE2c0zcEZ8t3DOaWATm65M5L9VmFCgxMIrl37zbSL1ogJ0isCoV72Ukg8xL

