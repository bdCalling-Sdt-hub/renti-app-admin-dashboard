import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BLockUser } from "../../../ReduxSlices/BlockSlice";
import BlockUserCard from "../../BlockUserCard/BlockUserCard";

const BlockList = () => {
  const dispatch = useDispatch();
  const { blockUser } = useSelector((state) => state.BlockUser);
  const [reload, setReload] = useState(1);

  console.log(blockUser);

  useEffect(() => {
    dispatch(BLockUser());
  }, [reload]);

  return (
    <div style={{ background: "white", padding: "30px", borderRadius: "10px" }}>
      <Row gutter={[16, 16]}>
        {blockUser.map((blUser) => (
          <BlockUserCard key={blUser._id} data={blUser} setReload={setReload} />
        ))}
      </Row>
    </div>
  );
};

export default BlockList;
