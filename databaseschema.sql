create table Questions
(
    id                int auto_increment
        primary key,
    person_name       varchar(255) default 'Anonymous' not null,
    title             varchar(255)                     not null,
    description       text                             not null,
    created_at        datetime                         not null,
    updated_at        datetime                         not null,
    deleted_at        datetime                         null,
    number_of_answers int          default 0           not null,
    deleted_by        varchar(255)                     null,
    created_by        varchar(255)                     null,
    updated_by        varchar(255)                     null
)
    auto_increment = 7;

create table Answers
(
    id              int auto_increment
        primary key,
    question_id     int                                    not null,
    title           varchar(255)                           not null,
    description     varchar(255)                           not null,
    recommendations varchar(255)                           not null,
    created_at      datetime                               not null,
    updated_at      datetime                               not null,
    deleted_at      datetime                               null,
    is_draft        datetime default '1970-01-01 00:00:00' not null,
    deleted_by      int                                    null,
    created_by      int                                    not null,
    updated_by      int                                    null,
    constraint unique_answer
        unique (is_draft, question_id),
    constraint Answers_ibfk_1
        foreign key (question_id) references Questions (id)
)
    auto_increment = 7;

create index question_id
    on Answers (question_id);

create table SequelizeMeta
(
    name varchar(255) not null
        primary key,
    constraint name
        unique (name)
)
    collate = utf8_unicode_ci;

create table Users
(
    id          int auto_increment
        primary key,
    username    varchar(255)                   not null,
    email       varchar(255)                   not null,
    first_name  varchar(255)                   not null,
    middle_name varchar(255)                   null,
    last_name   varchar(255)                   not null,
    password    varchar(255)                   not null,
    created_at  datetime                       not null,
    updated_at  datetime                       not null,
    created_by  int                            null,
    updated_by  int                            null,
    deleted_at  datetime                       null,
    deleted_by  varchar(255)                   null,
    role        enum ('patient', 'consultant') not null,
    constraint email
        unique (email),
    constraint username
        unique (username)
)
    auto_increment = 3;

