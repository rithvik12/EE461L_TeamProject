import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class DatasetList extends Component {

  render() {
    return (
      <div>
        <hgroup>
          <h3>Datasets</h3>
        </hgroup>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Dataset</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A Pressure Map Dataset for In-Bed Posture Classification</td>
              <td>Pressure sensor data captured from 13 participants in various sleeping postures.</td>
              <td>
                <a href={"https://physionet.org/static/published-projects/pmd/a-pressure-map-dataset-for-in-bed-posture-classification-1.0.0.zip"}>Download</a>
              </td>
            </tr>
            <tr>
              <td>Body Sway When Standing and Listening to Music Modified to Reinforce Virtual Reality Environment Motion</td>
              <td>This data were intended to show that music manipulated to match VR motion provided by an Oculus Rift head mounted display increased body sway when standing still.</td>
              <td>
                <a href={"https://physionet.org/static/published-projects/body-sway-music-vr/body-sway-when-standing-and-listening-to-music-modified-to-reinforce-virtual-reality-environment-motion-1.0.0.zip"}>Download</a>
              </td>
            </tr>
            <tr>
              <td>Complex Upper Limb Movements</td>
              <td>Hand trajectory data collected from subjects as they performed various upper-limb motor tasks.</td>
              <td>
                <a href={"https://physionet.org/static/published-projects/culm/complex-upper-limb-movements-1.0.0.zip"}>Download</a>
              </td>
            </tr>
            <tr>
              <td>Physiologic Response to Changes in Posture</td>
              <td>A collection of physiological signals in ten healthy subjects in response to a slow tilt, a fast tilt, and a standing-up maneuver.</td>
              <td>
                <a href={"https://physionet.org/static/published-projects/prcp/physiologic-response-to-changes-in-posture-1.0.0.zip"}>Download</a>
              </td>
            </tr>
            <tr>
              <td>Stress Recognition in Automobile Drivers</td>
              <td>This database, contributed to PhysioNet by its creator, Jennifer Healey, contains a collection of multiparameter recordings from healthy volunteers, taken while they were driving on a prescribed route.</td>
              <td>
                <a href={"https://physionet.org/static/published-projects/drivedb/stress-recognition-in-automobile-drivers-1.0.0.zip"}>Download</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}