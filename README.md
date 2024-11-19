*Application is running only with enabled DataBase*
________________________________________________________________________________________________________________

Project have PostgreSQL involved properties in application.properties.

1) For first launch, get ready your Data Base, change 'spring.datasource.url' property correspond yours.
2) And change 'spring.jpa.hibernate.ddl-auto' property to be equal "create". After first successful launch, recommend to change it to "update" or "none" for persisting data.
3) For Using with different Data Bases, make sure to change JPA's dialect in 'spring.jpa.database-platform' property.
4) Mail client can work with the same setups. If you want to change it to your own, check the guid for Side Application sign in: https://support.google.com/mail/answer/185833?hl=en

*At the moment, Docker is turned off for simplicity of developing
