import {
  createCanvas,
  registerFont,
  CanvasRenderingContext2D,
  loadImage,
} from 'canvas';
import {
  ShareResultModalProps,
  ShareTopicModalProps,
} from '@/shared/types/ui/Modal';
import { COLOR } from '@/shared/constants/COLOR';
import path from 'path';
import { PollResult } from '@/shared/types/data/dashboard';
import {
  getNumberSign,
  numberSuffix,
  thousandFormat,
} from '@/shared/utils/number';
import { ColorType } from '@/shared/types/ui/Color';
import { GraphColorMap } from '@/components/container/graph-container';

export const generatePollResultImage = async ({
  competitors,
  totalGain,
  totalPnL,
  totalPoolIn,
}: PollResult) => {
  const canvas = createCanvas(2000, 1600);
  const ctx = canvas.getContext('2d');

  const {
    data: { poolIn },
  } = competitors.reduce((prev, current) => {
    return prev.data.poolIn > current.data.poolIn ? prev : current;
  });

  registerFont(path.resolve('@/assets/fonts/DMMono-Light.ttf'), {
    family: 'DMMono-Light',
  });

  registerFont(path.resolve('@/assets/fonts/DMMono-Regular.ttf'), {
    family: 'DMMono-Regular',
  });

  registerFont(path.resolve('@/assets/fonts/DMMono-Medium.ttf'), {
    family: 'DMMono-Medium',
    weight: 'bold',
  });

  registerFont(path.resolve('@/assets/fonts/RubikMonoOne-Regular.ttf'), {
    family: 'RubikMono-Regular',
  });

  ctx.fillStyle = COLOR.LIGHT_CREAM_1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineWidth = 8;
  ctx.fillStyle = COLOR.DARK;
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = '52px DMMono-Medium';
  ctx.fillStyle = COLOR.DARK_GRAY_2;
  ctx.fillText('Your poll results', canvas.width / 2, 96);

  ctx.font = '32px DMMono-Regular';
  ctx.fillStyle = COLOR.DARK_GRAY_2;
  ctx.fillText('You have won', canvas.width / 2 - 280, 176);

  ctx.font = '32px DMMono-Medium';
  ctx.fillStyle = getNumberSign(totalGain).color;
  ctx.fillText(
    `${getNumberSign(totalGain).sign}${totalGain} $HONEY (${getNumberSign(totalGain).sign}${totalPnL}%)`,
    canvas.width / 2,
    176,
  );

  ctx.font = '32px DMMono-Regular';
  ctx.fillStyle = COLOR.DARK_GRAY_2;
  ctx.fillText('in total!', canvas.width / 2 + 240, 176);

  ctx.textAlign = 'start';
  ctx.font = '44px DMMono-Medium';
  ctx.fillStyle = COLOR.DARK;
  ctx.fillText('Total volume locked', 120, 290);

  ctx.textAlign = 'start';
  ctx.font = '42px DMMono-Regular';
  ctx.fillStyle = COLOR.DARK_GRAY_5;
  ctx.fillText('($HONEY)', 630, 290);

  ctx.textAlign = 'end';
  ctx.font = '32px DMMono-Medium';
  ctx.fillStyle = COLOR.DARK_GRAY_5;
  ctx.fillText('My Pool', canvas.width - 560, 290);

  ctx.textAlign = 'end';
  ctx.font = '32px DMMono-Medium';
  ctx.fillStyle = COLOR.DARK_GRAY_5;
  ctx.fillText('PnL ($)', canvas.width - 340, 290);

  ctx.textAlign = 'end';
  ctx.font = '32px DMMono-Medium';
  ctx.fillStyle = COLOR.DARK_GRAY_5;
  ctx.fillText('PnL (%)', canvas.width - 120, 290);

  const xGap = 60;
  const yGap = 130;

  competitors.forEach((competitor, index) => {
    const sign = getNumberSign(competitor.data.poolIn);

    ctx.textAlign = 'start';
    ctx.font = '32px DMMono-Medium';
    ctx.fillStyle = COLOR.DARK;
    ctx.fillText(
      `${index + 1}${numberSuffix(index + 1)}`,
      120,
      430 + index * yGap,
    );

    ctx.textAlign = 'start';
    ctx.font = '32px DMMono-Medium';
    ctx.fillStyle = COLOR.DARK_GRAY_5;
    ctx.fillText(`${competitor.name}`, 200 + xGap, 430 + index * yGap);

    const chunk = poolIn / 100;
    const ratio = Math.floor(competitor.data.poolIn / chunk);
    const image = generateResultGraphImage(GraphColorMap[index + 1], ratio);
    ctx.drawImage(image, 550, 375 + index * yGap);

    ctx.textAlign = 'end';
    ctx.font = '32px DMMono-Medium';
    ctx.fillStyle = COLOR[sign.color];
    ctx.fillText(
      `${sign.sign}$${thousandFormat(competitor.data.poolIn)}`,
      canvas.width - 560,
      430 + index * yGap,
    );

    ctx.textAlign = 'end';
    ctx.font = '32px DMMono-Medium';
    ctx.fillStyle = COLOR[sign.color];
    ctx.fillText(
      `${sign.sign}$${thousandFormat(competitor.data.gain)}`,
      canvas.width - 340,
      430 + index * yGap,
    );

    ctx.textAlign = 'end';
    ctx.font = '32px DMMono-Medium';
    ctx.fillStyle = COLOR[sign.color];
    ctx.fillText(
      `${sign.sign}%${thousandFormat(competitor.data.pnl)}`,
      canvas.width - 120,
      430 + index * yGap,
    );
  });

  ctx.textAlign = 'start';
  ctx.font = '44px DMMono-Medium';
  ctx.fillStyle = COLOR.DARK;
  ctx.fillText('Total', 120, 1480);

  const totalSign = getNumberSign(totalGain);

  ctx.textAlign = 'end';
  ctx.font = '32px DMMono-Medium';
  ctx.fillStyle = COLOR[totalSign.color];
  ctx.fillText(
    `${totalSign.sign}$${thousandFormat(totalPoolIn)}`,
    canvas.width - 560,
    1480,
  );

  ctx.textAlign = 'end';
  ctx.font = '32px DMMono-Medium';
  ctx.fillText(`${totalSign.sign}$${totalGain}`, canvas.width - 340, 1480);

  ctx.textAlign = 'end';
  ctx.font = '32px DMMono-Medium';
  ctx.fillText(`${totalSign.sign}%${totalPnL}`, canvas.width - 120, 1480);

  const buffer = canvas.toBuffer('image/png');

  return buffer;
};

export const generateResultGraphImage = (color: ColorType, range: number) => {
  const canvas = createCanvas(550, 90);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = COLOR.BASE_CREAM_1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = range === 0 ? COLOR['BASE_CREAM_1'] : COLOR[color];
  ctx.fillRect(0, 0, (canvas.width / 100) * range, canvas.height);

  ctx.lineWidth = 2;
  ctx.fillStyle = COLOR.DARK_GRAY_2;
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.fillStyle = COLOR.DARK_GRAY_4;
  ctx.rect(
    (canvas.width / 100) * range,
    0,
    (canvas.width / 100) * range + 1,
    canvas.height,
  );
  ctx.stroke();

  return canvas;
};

export const generateResultImage = async ({
  title,
  roundText,
  dateText,
  option,
}: ShareResultModalProps) => {
  const canvas = createCanvas(2200, 1200);
  const ctx = canvas.getContext('2d');

  registerFont(path.resolve('@/assets/fonts/DMMono-Light.ttf'), {
    family: 'DMMono-Light',
  });

  registerFont(path.resolve('@/assets/fonts/DMMono-Regular.ttf'), {
    family: 'DMMono-Regular',
  });

  registerFont(path.resolve('@/assets/fonts/DMMono-Medium.ttf'), {
    family: 'DMMono-Medium',
    weight: 'bold',
  });

  registerFont(path.resolve('@/assets/fonts/RubikMonoOne-Regular.ttf'), {
    family: 'RubikMono-Regular',
  });

  ctx.fillStyle = COLOR.LIGHT;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineWidth = 8;
  ctx.fillStyle = COLOR.DARK;
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.stroke();

  ctx.textAlign = 'start';
  ctx.font = '32px DMMono-Light';
  ctx.fillStyle = COLOR.DARK_GRAY_2;
  ctx.fillText(roundText, 120, 96);

  ctx.lineWidth = 2;
  ctx.fillStyle = COLOR.DARK;
  ctx.moveTo(315, 69);
  ctx.lineTo(315, 100);
  ctx.rect(220, 0, 200, 0);
  ctx.stroke();

  const myOption = await loadOptionImage(option.name, option.imageUrl);
  ctx.drawImage(myOption, 120, 270);

  const calendar = await loadStaticImage('@/assets/icons/calendar.png');
  ctx.drawImage(calendar, 355, 60);

  ctx.textAlign = 'start';
  ctx.font = '32px DMMono-Light';
  ctx.fillStyle = COLOR.DARK_GRAY_2;
  ctx.fillText(dateText, 420, 96);

  ctx.textAlign = 'start';
  ctx.font = '52px DMMono-Medium';
  ctx.fillStyle = COLOR.DARK;
  ctx.fillText(title, 120, 200);

  const buffer = canvas.toBuffer('image/png');

  return buffer;
};

export const generateShareImage = async ({
  title,
  roundText,
  dateText,
  options,
}: ShareTopicModalProps) => {
  const canvas = createCanvas(2200, 1200);
  const ctx = canvas.getContext('2d');

  registerFont(path.resolve('@/assets/fonts/DMMono-Light.ttf'), {
    family: 'DMMono-Light',
  });

  registerFont(path.resolve('@/assets/fonts/DMMono-Regular.ttf'), {
    family: 'DMMono-Regular',
  });

  registerFont(path.resolve('@/assets/fonts/DMMono-Medium.ttf'), {
    family: 'DMMono-Medium',
    weight: 'bold',
  });

  registerFont(path.resolve('@/assets/fonts/RubikMonoOne-Regular.ttf'), {
    family: 'RubikMono-Regular',
  });

  ctx.fillStyle = COLOR.LIGHT;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineWidth = 8;
  ctx.fillStyle = COLOR.DARK;
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.stroke();

  ctx.textAlign = 'start';
  ctx.font = '32px DMMono-Light';
  ctx.fillStyle = COLOR.DARK_GRAY_2;
  ctx.fillText(roundText, 120, 96);

  ctx.lineWidth = 2;
  ctx.fillStyle = COLOR.DARK;
  ctx.moveTo(490, 69);
  ctx.lineTo(490, 100);
  ctx.rect(220, 0, 200, 0);
  ctx.stroke();

  const calendar = await loadStaticImage('@/assets/icons/calendar.png');
  ctx.drawImage(calendar, 525, 60);

  ctx.textAlign = 'start';
  ctx.font = '32px DMMono-Light';
  ctx.fillStyle = COLOR.DARK_GRAY_2;
  ctx.fillText(dateText, 600, 96);

  ctx.textAlign = 'start';
  ctx.font = '52px DMMono-Medium';
  ctx.fillStyle = COLOR.DARK;
  ctx.fillText(title, 120, 200);

  const firstOption = await loadOptionImage(
    options[0].name,
    options[0].imageUrl,
  );
  ctx.drawImage(firstOption, 120, 270);

  const secondOption = await loadOptionImage(
    options[1].name,
    options[1].imageUrl,
  );
  ctx.drawImage(secondOption, canvas.width - 870 - 120, 270);

  ctx.textAlign = 'center';
  ctx.font = '56px RubikMono-Regular';
  ctx.fillStyle = COLOR.LIGHT;
  ctx.lineWidth = 6;
  ctx.fillText('VS', canvas.width / 2, canvas.height / 2 + 105);

  ctx.strokeStyle = COLOR.BASE_BLUE_1;
  ctx.strokeText('VS', canvas.width / 2, canvas.height / 2 + 105);

  const buffer = canvas.toBuffer('image/png');

  return buffer;
};

export const loadStaticImage = async (path: string) => {
  const canvas = createCanvas(50, 50);
  const ctx = canvas.getContext('2d');

  const imageBuffer = await loadImage(path);

  ctx.drawImage(imageBuffer, 0, 0);

  return canvas;
};

export const loadOptionImage = async (title: string, imageUrl: string) => {
  const canvas = createCanvas(870, 870);
  const ctx = canvas.getContext('2d');

  registerFont(path.resolve('@/assets/fonts/RubikMonoOne-Regular.ttf'), {
    family: 'RubikMono-Regular',
  });

  drawRoundedRect(ctx, 0, 0, canvas.width, canvas.height, 30);
  ctx.clip();

  const image = await loadRemoteImage(title, imageUrl, true);

  ctx.lineWidth = 2;
  ctx.fillStyle = COLOR.DARK;
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.stroke();

  ctx.drawImage(image, 20, 20, canvas.width - 40, canvas.height - 40);

  ctx.textAlign = 'center';
  ctx.font = '48px RubikMono-Regular';
  ctx.fillStyle = COLOR.LIGHT;
  ctx.lineWidth = 4;
  ctx.fillText(title, canvas.width / 2, canvas.height / 2);

  ctx.strokeStyle = COLOR.BASE_RED_1;
  ctx.strokeText(title, canvas.width / 2, canvas.height / 2);

  return canvas;
};

export const loadRemoteImage = async (
  title: string,
  remoteUrl: string,
  round: boolean,
) => {
  const canvas = createCanvas(870, 870);
  const ctx = canvas.getContext('2d');

  const response = await fetch(remoteUrl);
  const imageBuffer = await response.arrayBuffer();

  if (round) {
    drawRoundedRect(ctx, 0, 0, canvas.width, canvas.height, 30);
    ctx.clip();
  }

  const image = await loadImage(Buffer.from(imageBuffer));
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  return canvas;
};

const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
};
