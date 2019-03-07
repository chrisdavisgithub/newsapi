import { Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';
 
<WrappedComponent ariaLabel="test">
<PatternLines
  id="normal"
  height={8}
  width={8}
  stroke="#fff"
  background="#e64980"
  strokeWidth={1}
  orientation={[ "horizontal","vertical" ]}
/>
<BarSeries
  stroke="#e64980"
  fillOpacity={0.15}
  fill="url(#normal)"
  rawData={[ 9.956715670821106,9.980967807057258,… ]}
/>
<DensitySeries
  stroke="#e64980"
  showArea={false}
  smoothing={0.01}
  kernel="parabolic"
  rawData={[ 9.956715670821106,9.980967807057258,… ]}
/>
<XAxis/>
<YAxis/>
</WrappedComponent>
