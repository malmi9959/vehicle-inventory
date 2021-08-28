import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Badge,
  Button,
} from "@windmill/react-ui";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { EditIcon, EyeIcon, TrashIcon } from "../../icons";

const Vehicles = () => {
  return (
    <Fragment>
      <PageTitle>Vehicles</PageTitle>

      <SectionTitle>Vehicle Information</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Vehicle No</TableCell>
              <TableCell>Reg No</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Next Service Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center text-sm">
                  {/* <Avatar
                      className="hidden mr-3 md:block"
                      src={user.avatar}
                      alt="User avatar"
                    /> */}
                  <div>
                    <p className="font-semibold">VH001</p>
                    {/* <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.job}
                      </p> */}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">0001</span>
              </TableCell>
              <TableCell>
                <Badge type="primary">Van</Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm">Wishvantha Perera</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">October 22, 2021</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-4">
                  <Button
                    tag={Link}
                    to="/app/vehicle/VH001"
                    layout="link"
                    size="icon"
                    aria-label="Edit"
                  >
                    <EyeIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button layout="link" size="icon" aria-label="Edit">
                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  {/* <Button layout="link" size="icon" aria-label="Delete">
                    <TrashIcon className="w-5 h-5" aria-hidden="true" />
                  </Button> */}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TableFooter>
          {/* <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          /> */}
        </TableFooter>
      </TableContainer>
    </Fragment>
  );
};

export default Vehicles;
