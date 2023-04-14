import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import RenderTree from "../../Components/RenderTree/RenderTree";
import { AlertContext } from "../../Context/AlertContext";

function toTree(data, pid = null) {
  return data?.reduce((r, e) => {
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
  const {dispatchAlert} = useContext(AlertContext)
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
  const deleteItem = async (itemGuid) => {
    await axios
      .post(`/delete`, {
        table: name,
        guids: itemGuid,
      })
      .then((res) => {
        console.log(res);
        getData();
      });
  };

  useEffect(() => {
    getData();
  }, [name]);
  const onSubmit = async (values) => {
    let body = {
      dat: values,
      columns: Object.keys(values),
      table: name,
    };
    let res = await axios.post(`/create`, {
      ...body,
    });
    if (res?.statusText === "OK") {
      dispatchAlert({
        open: true,
        type: "success",
        msg: "Added Successfully...",
      });
      getData();
    } else {
    }
  };

  return (
    <BlockPaper title="Chart">
      {!loading ? (
        <RenderTree
          chartTree={chartTree}
          name={name}
          deleteItem={deleteItem}
          onSubmit={onSubmit}
        />
      ) : null}
    </BlockPaper>
  );
};

export default Chart;
