-- public.cliente definition

-- Drop table

-- DROP TABLE public.cliente;

CREATE TABLE public.cliente (
	id_cliente bigserial NOT NULL,
	data_nascimento timestamp NULL,
	email varchar(255) NULL,
	endereco varchar(255) NULL,
	nome varchar(255) NULL,
	telefone varchar(255) NULL,
	CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente)
);


-- public.servico definition

-- Drop table

-- DROP TABLE public.servico;

CREATE TABLE public.servico (
	id_servico bigserial NOT NULL,
	descricao varchar(255) NULL,
	preco float8 NULL,
	CONSTRAINT servico_pkey PRIMARY KEY (id_servico)
);


-- public.agenda definition

-- Drop table

-- DROP TABLE public.agenda;

CREATE TABLE public.agenda (
	id_agenda bigserial NOT NULL,
	data_agendamento timestamp NULL,
	horario varchar(255) NULL,
	status varchar(255) NULL,
	id_cliente int8 NULL,
	id_servico int8 NULL,
	CONSTRAINT agenda_pkey PRIMARY KEY (id_agenda),
	CONSTRAINT fk8n5jfad7xe7n5qr5ru7j3sl4c FOREIGN KEY (id_servico) REFERENCES public.servico(id_servico),
	CONSTRAINT fk9ovuenx1vsuek79lwfi5mqng4 FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente)
);