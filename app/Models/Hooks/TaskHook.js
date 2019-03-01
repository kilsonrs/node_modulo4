"use strict";

const Kue = use("Kue");
const Job = use("App/Jobs/NewTaskMail");

const TaskHook = (exports = module.exports = {});

TaskHook.sendNewTaskMail = async taskInstance => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return;

  const { email, username } = await taskInstance.user().fetch();
  const file = await taskInstance.file().fetch();

  const { title } = taskInstance;

  Kue.dispatch(Job.key, { email, username, title, file }, { attempts: 3 });
};

//dirt => Grava dentro do model, qual foram as novas informações gravadas neste model
// !!  => Tática pra vc transformar uma variável em um booleano.
