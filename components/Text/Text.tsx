import {TextRichTextItemResponse} from '@notionhq/client/build/src/api-endpoints';
import React from 'react';
import styles from './Text.module.css';

interface TextProps {
  children: TextRichTextItemResponse;
}

const Text: React.FC<TextProps> = ({children}) => {
  if (!children) {
    return null;
  }
  const {
    annotations: {bold, code, color, italic, strikethrough, underline},
    text,
  } = children;

  return (
    <span
      className={[
        bold ? styles.bold : '',
        code ? styles.code : '',
        italic ? styles.italic : '',
        strikethrough ? styles.strikethrough : '',
        underline ? styles.underline : '',
      ].join(' ')}
      style={color !== 'default' ? {color} : {}}
    >
      {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
    </span>
  );
};

export default Text;
