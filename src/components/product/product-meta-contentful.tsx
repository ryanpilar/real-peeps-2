import { useState } from "react";
import { Collapse } from "@components/common/accordion";

interface Props {
  data: any;
}

const ProductContentfulMeta: React.FC<Props> = ({ data }) => {
  const [expanded, setExpanded] = useState<number>(0);

  const productDetails = data?.contentfulData?.productDetails;
  const additionalInfo = data?.contentfulData?.additionalInfo;

  return (
    <>
      {productDetails &&
        [productDetails].map((item: any, index: any) => (
          <Collapse
            i={index}
            key="Product Details"
            title="Product Details"
            translatorNS="review"
            content={item}
            expanded={expanded}
            setExpanded={setExpanded}
            variant="transparent"
          />
        ))}

      {additionalInfo &&
        [additionalInfo].map((item: any, index: any) => (
          <Collapse
            i={index}
            key="Addition Info"
            title="Addition Info"
            translatorNS="review"
            content={item}
            expanded={expanded}
            setExpanded={setExpanded}
            variant="transparent"
          />
        ))}
    </>
  );
};

export default ProductContentfulMeta;
