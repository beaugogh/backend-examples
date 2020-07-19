create schema if not exists deduplication_feedback;

use deduplication_feedback;

create table if not exists similarities
(
	id_1 varchar(255) not null,
	id_2 varchar(255) not null,
	jaccard float(4, 3),
	dice float(4, 3),
	cosine float(4, 3) not null,
	wmd float(8, 3),
	duplicated boolean not null,
	primary key (id_1, id_2)
);

create table if not exists feedback
(
	id bigint(20) auto_increment
		primary key,
	id_1 varchar(255) not null,
	id_2 varchar(255) not null,
	duplicated boolean not null,
	creator varchar(255) not null,
	create_date datetime not null
);

create table trials
(
	TrialID varchar(255) not null
		primary key,
	Primary_Register_text text null,
	Date_registration varchar(255) null,
	Primary_sponsor text null,
	Secondary_Sponsor text null,
	Public_title text null,
	Scientific_title text null,
	Acronym varchar(255) null,
	Date_enrollement varchar(255) null,
	Target_size text null,
	Recruitment_status text null,
	URL varchar(255) null,
	Study_type varchar(255) null,
	Study_design text null,
	Phase varchar(255) null,
	child_flag varchar(255) null,
	Country varchar(255) null,
	Contacts text null,
	Inclusion_criteria text null,
	Exclusion_criteria text null,
	Inclusion_agemin varchar(255) null,
	Inclusion_agemax varchar(255) null,
	Inclusion_sex varchar(255) null,
	Health_condition text null,
	Intervention text null,
	Primary_outcome text null,
	Secondary_outcome text null,
	Secondary_IDs text null,
	Source_support text null,
	lang varchar(10) null
);

