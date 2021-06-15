import React from "react";
import MaterialTable from "material-table";
import { forwardRef, createRef } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { resetServerContext } from "react-beautiful-dnd";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MoreIcon from "@material-ui/icons/More";
import theme from "styles/theme";
import localization from "utils/lang/table";
import { Box, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddBox {...props} ref={ref} color="primary" />
  )),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline color="error" {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit color="primary" {...props} ref={ref} />
  )),
  Detail: forwardRef((props, ref) => (
    <MoreIcon color="primary" {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref) => (
    <SaveAlt color="primary" {...props} ref={ref} />
  )),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function BaseTable({
  title = "",
  data = [],
  columns = [],
  onRowAdd = (_newData) => {},
  onRowUpdate = (_newData, _oldData) => {},
  onRowDelete = (_oldData) => {},
  handleOpenDetail = () => {},
  detailPanel = undefined,
  disableAdd = false,
  disableUpdate = false,
  disableDelete = false,
  disableDetail = false,
  disableActions = false,
  disableExport = false,
  options = [],
  actions = [],
}) {
  resetServerContext();
  const tableRef = createRef();
  const editableActions = {
    onRowAdd: disableAdd ? undefined : onRowAdd,
    onRowUpdate: disableUpdate ? undefined : onRowUpdate,
    onRowDelete: disableDelete ? undefined : onRowDelete,
  };
  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        tableRef={tableRef}
        icons={tableIcons}
        title={title}
        data={data}
        columns={columns}
        localization={localization}
        editable={editableActions}
        options={{
          ...options,
          actionsColumnIndex: -1,
          exportButton: disableExport ? false : true,
        }}
        detailPanel={detailPanel}
        components={{
          Container: (props) => props.children,
        }}
        actions={
          disableActions
            ? []
            : [
                ...actions,
                {
                  icon: () => (
                    <Box
                      style={{
                        color: theme.palette.optional.contrastText,
                        backgroundColor: "#020153",
                        padding: theme.spacing(1),
                        borderRadius: "4px",
                      }}
                    >
                      <Typography variant="body1">Detail</Typography>
                    </Box>
                  ),
                  tooltip: "Lihat Detail",
                  isFreeAction: false,
                  hidden: disableDetail ? true : false,
                  onClick: handleOpenDetail,
                },
              ]
        }
      />
    </ThemeProvider>
  );
}

export default BaseTable;
