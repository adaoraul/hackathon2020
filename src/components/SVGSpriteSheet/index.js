import React from 'react';
import LocationSymbol from '../LocationSymbol';
import DateSymbol from '../DateSymbol';
import AddPersonSymbol from '../AddPersonSymbol';
import LightningSymbol from '../LightningSymbol';
import QuoteSymbol from '../QuoteSymbol';
import XCloseSymbol from '../XCloseSymbol';
import './SVGSpriteSheet.css';

export const defaults = {
  className: 'SVGSpriteSheet',
  id: 'SVGSpriteSheet'
};

const SVGSpriteSheet = (props) => (
  <svg
    id={props.id || defaults.id}
    className={props.className || defaults.className}
  >
    <LocationSymbol />
    <DateSymbol />
    <AddPersonSymbol />
    <LightningSymbol />
    <QuoteSymbol />
    <XCloseSymbol />
  </svg>
);

export default SVGSpriteSheet;
