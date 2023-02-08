import { FC } from 'react';

import {
  Button,
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderName,
} from 'carbon-components-react';

import {
  faDiscord,
  faDiscourse,
  faGithub,
  faMedium,
  faTwitter,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStore } from '@nanostores/react';

import { useMutationReportStores } from '@state/context';

import logoUrl from './assets/logo.svg';

import {
  _header,
  _headerName,
  _headerNameText,
  _icon,
  _mediaLinkHover,
} from './MainHeader.css';

export const MainHeader: FC<unknown> = () => {
  const { reportStore } = useMutationReportStores();
  const report = useStore(reportStore);

  return (
    <Header className={_header}>
      <>
        <HeaderName
          href="http://certora.com/"
          prefix=""
          className={_headerName}
        >
          <img src={logoUrl} alt="Certora" />
          <span className={_headerNameText}>Mutation Report (open source)</span>
        </HeaderName>
        {report && (
          <Button onClick={() => reportStore.set()}>Reset report</Button>
        )}
        <HeaderGlobalBar>
          <SocialMediaLink
            link="https://github.com/certora/"
            label="GitHub"
            icon={faGithub}
          />
          <SocialMediaLink
            link="https://discord.com/invite/Z9wQfRqZYY"
            label="Discord"
            icon={faDiscord}
          />
          <SocialMediaLink
            link="https://forum.certora.com/"
            label="Discourse"
            icon={faDiscourse}
          />
          <SocialMediaLink
            link="https://medium.com/certora"
            label="Medium"
            icon={faMedium}
          />
          <SocialMediaLink
            link="https://twitter.com/certorainc"
            label="Twitter"
            icon={faTwitter}
          />
        </HeaderGlobalBar>
      </>
    </Header>
  );
};

const SocialMediaLink: FC<{
  link: string;
  icon: IconDefinition;
  label: string;
}> = ({ link, icon, label }) => (
  // @ts-expect-error: Under the hood HeaderGlobalAction spreads props in Button which has all these props
  <HeaderGlobalAction
    aria-label={label}
    {...{
      href: link,
      as: 'a',
      rel: 'noopener noreferrer',
      target: '_blank',
      className: _mediaLinkHover,
    }}
  >
    <FontAwesomeIcon className={_icon} icon={icon} />
  </HeaderGlobalAction>
);
