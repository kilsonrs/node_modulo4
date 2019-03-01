"use strict";

const Mail = use("Mail");
const Helpers = use("Helpers");

const TaskHook = (exports = module.exports = {});

TaskHook.sendNewTaskMail = async taskInstance => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return;

  const { email, username } = await taskInstance.user().fetch();
  const file = await taskInstance.file().fetch();

  const { title } = taskInstance;

  await Mail.send(
    ["emails.new_task"],
    { username, title, hasAttachment: !!file },
    message => {
      message
        .to(email)
        .from("kilson@hook.com", "Kilson R")
        .subject("Nova tarefa para você");

      if (file) {
        message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
          filename: file.name
        });
      }
    }
  );
};

//dirt => Grava dentro do model, qual foram as novas informações gravadas neste model
// !!  => Tática pra vc transformar uma variável em um booleano.
