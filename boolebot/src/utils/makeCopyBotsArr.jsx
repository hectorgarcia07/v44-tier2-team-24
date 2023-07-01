export default function makeCopyBotsArr(botsArr) {
    return botsArr.map(botInfo => {
      return { ...botInfo }
    });

  }
