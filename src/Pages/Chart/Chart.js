import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import axios from "axios";
import { useCallback } from "react";
import RenderTree from "../../Components/RenderTree/RenderTree";
import SuperForm from "../../Components/CustomForm/SuperForm";

function toTree(data, pid = null) {
  return data.reduce((r, e) => {
    if (e.ParentGUID == pid) {
      const obj = { ...e };
      const children = toTree(data, e.Guid);
      if (children.length) obj.children = children;
      r.push(obj);
    }
    return r;
  }, []);
}

const Chart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartTree, setChartTree] = useState();
  const params = useParams();
  const { name } = params;
  const getData = async () => {
    setLoading(true);
    await axios
      .post(`/list`, {
        table: name,
      })
      .then((res) => {
        setChartTree(toTree(res?.data?.recordset));
        setData(res?.data?.recordset);
        setLoading(false);
      });
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, [name]);

  return (
    <BlockPaper title="Chart">
      {!loading ? <RenderTree chartTree={chartTree} name={name} /> : null}
    </BlockPaper>
  );
};

export default Chart;
