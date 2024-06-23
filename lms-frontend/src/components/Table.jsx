import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Table,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
const ReactTable = ({ columnsArray, dataArray }) => {
  const columns = useMemo(() => columnsArray, [columnsArray]);
  const data = useMemo(() => dataArray, [dataArray]);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );
  return (
    <TableContainer pt={6}>
      <Table
        variant="simple"
        {...tableInstance.getTableProps()}
      >
        <Thead>
          {tableInstance.headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...tableInstance.getTableBodyProps()}>
          {tableInstance.page.map((row) => {
            tableInstance.prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
        <Flex pt={5} pb={5} gap={5}>
          <Button onClick={() => tableInstance.previousPage()}>Previous</Button>
          <Button onClick={() => tableInstance.nextPage()}>Next</Button>
        </Flex>
      </Table>
    </TableContainer>
  );
};

export default ReactTable;
