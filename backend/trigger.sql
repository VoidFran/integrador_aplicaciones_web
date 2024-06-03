CREATE TRIGGER `creacion` AFTER INSERT ON `actividad`
 FOR EACH ROW INSERT INTO actividad_auditoria(id_actividad,descripcion,id_usuario_actual,prioridad,id_usuario_modificacion,fecha_modificacion,estado,operacion)VALUES(NEW.id,NEW.descripcion,NEW.id_usuario_actual,NEW.prioridad,NEW.id_usuario_modificacion,NEW.fecha_modificacion,NEW.estado,'CREACIÓN');

CREATE TRIGGER `modificacion` AFTER UPDATE ON `actividad`
 FOR EACH ROW INSERT INTO actividad_auditoria(id_actividad,descripcion,id_usuario_actual,prioridad,id_usuario_modificacion,fecha_modificacion,estado,operacion)VALUES(NEW.id,NEW.descripcion,NEW.id_usuario_actual,NEW.prioridad,NEW.id_usuario_modificacion,NEW.fecha_modificacion,NEW.estado,'Modificación');
