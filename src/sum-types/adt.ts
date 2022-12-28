/* eslint-disable no-console */
import { console as C, function as F } from 'fp-ts';
import * as Sum from '@unsplash/sum-types';

const { pipe } = F;

type Weather = Sum.Member<'Sun'> | Sum.Member<'Rain', number>;

const Weather = Sum.create<Weather>();

const getRainfall = Weather.match({
  Rain: (n) => `${n}mm`,
  Sun: () => 'none',
});

const todayWeather = Weather.mk.Rain(5);

pipe(todayWeather, getRainfall, C.log)();
