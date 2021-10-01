SET check_function_bodies = false;
--
-- Structure for table roles : 
--
SET search_path = public, pg_catalog;
CREATE TABLE public.roles (
    id integer NOT NULL,
    codigo character varying NOT NULL,
    descripcion character varying,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
)
WITH (oids = false);
--
-- Structure for table menus : 
--
CREATE TABLE public.menus (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    codigo character varying NOT NULL,
    menu_id integer,
    url character varying,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
)
WITH (oids = false);
--
-- Structure for table usuarios : 
--
CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    apellido character varying,
    email character varying NOT NULL,
    password character varying,
    imagen character varying,
    estado boolean NOT NULL,
    google boolean,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
)
WITH (oids = false);
--
-- Structure for table roles_menus : 
--
CREATE TABLE public.roles_menus (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    rol_id integer NOT NULL,
    menu_id integer NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
)
WITH (oids = false);
--
-- Structure for table usuarios_roles : 
--
CREATE TABLE public.usuarios_roles (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    usuario_id integer,
    roles_id integer,
    estado boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
)
WITH (oids = false);
--
-- Definition for index PRIMARY : 
--
CREATE UNIQUE INDEX "PRIMARY" ON public.usuarios USING btree (id);
--
-- Definition for index email : 
--
CREATE UNIQUE INDEX email ON public.usuarios USING btree (email);
--
-- Definition for index roles_pkey : 
--
ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_pkey
    PRIMARY KEY (id);
--
-- Definition for index codigo_rol_unico : 
--
ALTER TABLE ONLY roles
    ADD CONSTRAINT codigo_rol_unico
    UNIQUE (codigo);
--
-- Definition for index menus_pkey : 
--
ALTER TABLE ONLY menus
    ADD CONSTRAINT menus_pkey
    PRIMARY KEY (id);
--
-- Definition for index recursivo : 
--
ALTER TABLE ONLY menus
    ADD CONSTRAINT recursivo
    FOREIGN KEY (menu_id) REFERENCES menus(id) NOT VALID;
--
-- Definition for index usuarios_pkey : 
--
ALTER TABLE ONLY usuarios
    ADD CONSTRAINT usuarios_pkey
    PRIMARY KEY (id);
--
-- Definition for index roles_menus_pkey : 
--
ALTER TABLE ONLY roles_menus
    ADD CONSTRAINT roles_menus_pkey
    PRIMARY KEY (id);
--
-- Definition for index fk_menu : 
--
ALTER TABLE ONLY roles_menus
    ADD CONSTRAINT fk_menu
    FOREIGN KEY (menu_id) REFERENCES menus(id);
--
-- Definition for index fk_rol : 
--
ALTER TABLE ONLY roles_menus
    ADD CONSTRAINT fk_rol
    FOREIGN KEY (rol_id) REFERENCES roles(id);
--
-- Definition for index usuarios_roles_pkey : 
--
ALTER TABLE ONLY usuarios_roles
    ADD CONSTRAINT usuarios_roles_pkey
    PRIMARY KEY (id);
--
-- Definition for index fk-rol : 
--
ALTER TABLE ONLY usuarios_roles
    ADD CONSTRAINT "fk-rol"
    FOREIGN KEY (roles_id) REFERENCES roles(id);
--
-- Definition for index fk-usuario : 
--
ALTER TABLE ONLY usuarios_roles
    ADD CONSTRAINT "fk-usuario"
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id);