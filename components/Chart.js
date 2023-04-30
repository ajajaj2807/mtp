import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "baseui/modal";
import { Button } from "baseui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const ChartModal = ({ data, isOpen, onClose }) => {
  const chartData = data.map((value, index) => ({
    name: index.toString(),
    ETo: value,
  }));

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalHeader>Chart</ModalHeader>
      <ModalBody>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <XAxis dataKey="name">
              <Label value="Day" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis>
              <Label angle={-90} value="Reference ET" position="insideLeft" />
            </YAxis>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ETo"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChartModal;
