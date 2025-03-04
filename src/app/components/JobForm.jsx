"use client";
import { useState } from "react";
import {
  Button,
  RadioGroup,
  TextArea,
  TextField,
  Theme,
} from "@radix-ui/themes";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { FaUser, FaStar } from "react-icons/fa";
import ImageUpload from "./ImageUpload";
import { redirect } from "next/navigation";
import { saveJobAction } from "../actions/jobActions";

export default function JobForm({ orgId, jobDoc }) {
  const [country, setCountry] = useState(null);
  const [currentState, setCurrentState] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);

  async function handleSaveJob(data) {
    data.set("country", country?.name || "");
    data.set("state", currentState?.name || "");
    data.set("city", currentCity?.name || "");
    data.set("countryId", country?.id?.toString() || "1");
    data.set("stateId", currentState?.id?.toString() || "1");
    data.set("cityId", currentCity?.id?.toString() || "1");
    data.set("orgId", orgId);

    const jobDoc = await saveJobAction(data);
    redirect(`/jobs/${jobDoc.orgId}`);
  }

  console.log(jobDoc)

  return (
    <Theme>
      <form
        action={handleSaveJob}
        className="container mt-6 flex flex-col gap-4"
      >
        {jobDoc && <input type="hidden" name="id" value={jobDoc._id} />}
        <TextField.Root
          name="title"
          placeholder="Job Title"
          defaultValue={jobDoc?.title || ""}
        />

        <div className="grid sm:grid-cols-3 gap-6 *:grow">
          <div>
            Remote?
            <RadioGroup.Root
              defaultValue={jobDoc?.remote || "hybrid"}
              name="remote"
            >
              <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
              <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
              <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Full time?
            <RadioGroup.Root defaultValue={jobDoc?.type || "full"} name="type">
              <RadioGroup.Item value="project">Project</RadioGroup.Item>
              <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
              <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Salary
            <TextField.Root name="salary" defaultValue={jobDoc?.salary || ""}>
              <TextField.Slot>$</TextField.Slot>
              <TextField.Slot>k/year</TextField.Slot>
            </TextField.Root>
          </div>
        </div>
        <div>
          Location
          <div className="flex flex-col sm:flex-row gap-4 *:grow">
            <CountrySelect
              containerClassName="form-group"
              defaultValue={!country ? {id: jobDoc?.countryId, name: jobDoc?.country} : 0 }
              inputClassName=""
              onChange={(_country) => {
                setCountry(_country);
                setCurrentState(null);
                setCurrentCity(null);
              }}
              onTextChange={(_txt) => console.log(_txt)}
              placeHolder="Select Country"
            />

            <StateSelect
              countryid={country?.id}
              defaultValue={!currentState ? {id: jobDoc?.stateId, name: jobDoc?.state} : currentState}
              containerClassName="form-group"
              inputClassName=""
              onChange={(_state) => setCurrentState(_state)}
              onTextChange={(_txt) => console.log(_txt)}
              placeHolder="Select State"
            />

            <CitySelect
              countryid={country?.id}
              stateid={currentState?.id}
              containerClassName="form-group"
              defaultValue={!currentCity ? {id: jobDoc?.cityId, name: jobDoc?.city} : currentCity }
              inputClassName=""
              onChange={(_city) => setCurrentCity(_city)}
              onTextChange={(_txt) => console.log(_txt)}
              placeHolder="Select City"
            />
          </div>
        </div>

        <div className="sm:flex">
          <div className="w-1/3">
            <h3>Job Icon</h3>
            <ImageUpload
              name={"jobIcon"}
              Icon={FaStar}
              defaultValue={jobDoc?.jobIcon || ""}
            />
          </div>
          <div className="grow">
            <h3>Contact person</h3>
            <div className="flex gap-2">
              <div className="">
                <ImageUpload
                  name={"contactPhoto"}
                  Icon={FaUser}
                  defaultValue={jobDoc?.contactPhoto || ""}
                />
              </div>
              <div className="grow flex flex-col gap-1">
                <TextField.Root
                  placeholder="Firdi Audi"
                  name="contactName"
                  defaultValue={jobDoc?.contactName || ""}
                >
                  <TextField.Slot>
                    <FaUser />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  placeholder="Phone"
                  type="tel"
                  name="contactPhone"
                  defaultValue={jobDoc?.contactPhone || ""}
                >
                  <TextField.Slot>+62</TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  placeholder="Email"
                  type="email"
                  name="contactEmail"
                   defaultValue={jobDoc?.contactEmail || ""}
                >
                  <TextField.Slot>@</TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
        </div>

        <TextArea
        defaultValue={jobDoc?.description || ""}
          placeholder="Job Description"
          resize={"vertical"}
          name="description"
        />
        <div className="flex justify-center">
          <Button size={"3"}>
            <span className="px-8">Save</span>
          </Button>
        </div>
      </form>
    </Theme>
  );
}
