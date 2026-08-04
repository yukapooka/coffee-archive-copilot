--
-- PostgreSQL database dump
--

\restrict MiBQXkqzbSZYH98L2hTiGzelIlkpD7a5SX54kdc0PYwsxrl4aGTDtovhDTnbess

-- Dumped from database version 17.10 (Homebrew)
-- Dumped by pg_dump version 17.10 (Homebrew)

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

--
-- Data for Name: EntryInterpretation; Type: TABLE DATA; Schema: public; Owner: yukasuzuki
--

INSERT INTO public."EntryInterpretation" (id, "entryId", occasion, "selectionSource", "selectionIntent", "moodBefore", "energyBefore", "momentFitRating", "repeatLikelihood", "interpretationNote", "memoryNote", "lingeringNote", "createdAt", "updatedAt", "energyAfter") VALUES ('cmqiyaf3u0000s0pkv03wtqra', 'cmqf9basu0000ufpkw86hd8gk', 'SOLO_WANDERING', 'FRIEND_RECOMMENDED', 'CURIOSITY', 'COMFORT_SEEKING', 'MEDIUM', 4, 'YES', NULL, 'Near alma mater', NULL, '2026-06-18 03:38:55.098', '2026-06-18 04:04:12.683', 'HIGH');


--
-- PostgreSQL database dump complete
--

\unrestrict MiBQXkqzbSZYH98L2hTiGzelIlkpD7a5SX54kdc0PYwsxrl4aGTDtovhDTnbess

