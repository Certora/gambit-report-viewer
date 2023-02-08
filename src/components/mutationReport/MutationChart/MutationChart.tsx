import { cloneElement, FC, useRef } from 'react';
import { useMeasure, useMount } from 'react-use';

import { useStore } from '@nanostores/react';

import { useMutationReportStores } from '@state/context';
import { truthy } from '@utils/ts';

import { useHandleNodeClick, useMutationChartData } from './hooks';
import { getCircleCoords, getCircleTranslate } from './utils';

import {
  _chartRoot,
  _mutantCircle,
  _root,
  _ruleCircle,
  _svg,
  _text,
  _textBg,
} from './MutationChart.css';

export const MutationChart: FC = () => {
  const [chartRootRef, { width, height }] = useMeasure<HTMLDivElement>();

  return (
    <div className={_root}>
      <h4>Coverage Map</h4>
      <div className={_chartRoot} ref={chartRootRef}>
        {height && width ? <Chart height={height} width={width} /> : null}
      </div>
    </div>
  );
};

const Chart: FC<{ height: number; width: number }> = ({ width, height }) => {
  const { selectionSetupStore, ruleNameToLabelStore, mutantNameToLabelStore } =
    useMutationReportStores();
  const selection = useStore(selectionSetupStore),
    ruleLabel = useStore(ruleNameToLabelStore),
    mutantLabel = useStore(mutantNameToLabelStore);

  const { root, flatRoot, k, view } = useMutationChartData(width, height);
  const handleNodeClick = useHandleNodeClick();

  if (!view) return null;

  return (
    <svg
      className={_svg}
      viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
      onClick={() => handleNodeClick(root)}
    >
      {flatRoot.map((node, i) => {
        const r = node.r * k || 0,
          [x, y] = getCircleTranslate(node, k, view);

        const selected = selection.selected.includes(node.data),
          active = selection.active.includes(node.data);

        const mutant = node.data.leaf,
          state = getStateFromBools(selected, active);

        return (
          <g
            key={i}
            transform={`translate(${x},${y})`}
            onClick={(e) => {
              e.stopPropagation();
              handleNodeClick(node);
            }}
          >
            <circle
              className={
                mutant
                  ? _mutantCircle[state]
                  : _ruleCircle[state === 'usual' ? state : 'selected']
              }
              r={r}
            />
            {mutant ? (
              <text className={_text[state]} transform="translate(0,5)">
                {mutantLabel.get(node.data.name.join(''))}
              </text>
            ) : (
              node.data.name.map((name, k) => {
                const [circleX, circleY] = getCircleCoords(
                  k,
                  node.data.name.length,
                  r,
                );

                const exactSelected = selection.trait === name,
                  exactActive = active || (!exactSelected && selected);

                const state = getStateFromBools(exactSelected, exactActive);

                return (
                  <g
                    key={k}
                    transform={`translate(${circleX},${circleY + 5})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeClick(node, name);
                    }}
                  >
                    <AddSvgBackground
                      className={_textBg[state]}
                      paddingX={8}
                      paddingY={3}
                      rx={10}
                      ry={10}
                    >
                      <text className={_text[state]}>
                        {ruleLabel.get(name)}
                      </text>
                    </AddSvgBackground>
                  </g>
                );
              })
            )}
          </g>
        );
      })}
    </svg>
  );
};

const getStateFromBools = (selected: boolean, active: boolean) =>
  selected ? 'selected' : active ? 'active' : 'usual';

const AddSvgBackground: FC<{
  children: JSX.Element;
  className?: string;

  paddingX: number;
  paddingY: number;
  rx: number;
  ry: number;
}> = ({
  children,
  className,

  paddingX,
  paddingY,
  rx,
  ry,
}) => {
  const childRef = useRef<SVGTextElement>(null),
    rectRef = useRef<SVGRectElement>(null);

  useMount(() => {
    const bounds = truthy(childRef.current).getBBox();
    const rect = truthy(rectRef.current);

    const attrs = {
      x: bounds.x - paddingX,
      y: bounds.y - paddingY,
      width: bounds.width + paddingX * 2,
      height: bounds.height + paddingY * 2,
      rx,
      ry,
    };

    for (const [attr, val] of Object.entries(attrs)) {
      rect.setAttribute(attr, val.toString());
    }
  });

  return (
    <>
      <rect className={className} ref={rectRef} />
      {cloneElement(children, { ...children.props, ref: childRef })}
    </>
  );
};
