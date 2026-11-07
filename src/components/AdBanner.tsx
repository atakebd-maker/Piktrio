import React, { useId } from 'react';

interface AdBannerProps {
  className?: string;
  label?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  className = '',
  label = 'Sponsored Ad',
}) => {
  const adId = useId();

  // 320x50 Adsterra / Bauval iframe banner
  const htmlContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      * { box-sizing: border-box; }
      body, html {
        margin: 0;
        padding: 0;
        width: 320px;
        height: 50px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key' : '7631f6e79f07c70c76180c7d781e9bda',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://bauval.org/22/7631f6e79f07c70c76180c7d781e9bda"></script>
  </body>
</html>`;

  return (
    <div className={`flex flex-col items-center justify-center my-3 w-full ${className}`}>
      {label && (
        <span className="text-[10px] tracking-wider uppercase font-semibold text-gray-400 mb-1 select-none">
          {label}
        </span>
      )}
      <div className="w-[320px] h-[50px] max-w-full overflow-hidden rounded-lg bg-[#0e0921] border border-[#2b1c52] shadow-xs flex items-center justify-center">
        <iframe
          id={adId}
          title={label}
          srcDoc={htmlContent}
          width="320"
          height="50"
          scrolling="no"
          frameBorder="0"
          style={{ border: 'none', width: '320px', height: '50px', overflow: 'hidden' }}
        />
      </div>
    </div>
  );
};
