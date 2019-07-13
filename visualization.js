document.addEventListener("DOMContentLoaded", () => {
    d3.json("/countries.json")
        .then(countries => {
            d3.csv("/europe-nato-members.csv")
                .then(members => {

                    // Define the dimensions of your visualization
                    const width = 800;
                    const height = 600;

                    // Get the visualization container
                    const container = d3.select("#viz")

                    // Append and configure your svg node
                    const svg = container.append("svg")
                        .attr("width", width)
                        .attr("height", height)

                    // Configure a map projection for Europe
                    const projection = d3.geoAzimuthalEqualArea()
                        .rotate([-10.0, -52.0])
                        .translate([width / 2, height / 2])
                        .scale(700)
                        .precision(.1);

                    // Configure a pathGenerator based on your projection
                    const pathGenerator = d3.geoPath().projection(projection)

                    // Bind the `countries.features` to `paths`
                    const shapes = svg.selectAll("path")
                        .data(countries.features)
                        .enter()
                        .append("path")
                        .attr("d", pathGenerator)
                        .attr("fill", function (country) {
                            const natoMetaData = members.find(member => member.iso3 === country.properties.ADM0_A3)
                            if (natoMetaData) {
                                return +natoMetaData.year_of_accession <= 2019
                                    ? "#004990"
                                    : "#DDDDDD"
                            } else {
                                return "#DDDDDD"
                            }
                        });

                    // Button data
                    const buttonData = [
                        {label: "1949", value: 1949},
                        {label: "Heute", value: 2019},
                    ];

                    const controls = d3.select("#controls")

                    const buttons = controls.selectAll("button")
                        .data(buttonData)
                        .enter()
                        .append("button")
                        .text(d => d.label)
                        .style("border", "none")
                        .style("padding", "0.5rem 1.25rem")
                        .style("font-size", "1rem")
                        .style("font-family", "system-ui")
                        .style("color", "inherit")
                        .style("background", d => {
                            return d.value === 2019 ? "#004990" : "#DDDDDD";
                        })
                        .style("outline", "transparent")
                        .on("click", function (d) {
                            buttons.style("background", "#DDDDDD");
                            d3.select(this).style("background", "#004990");
                            shapes.attr("fill", function (country) {
                                const natoMetaData = members.find(member => member.iso3 === country.properties.ADM0_A3)

                                // Ist oder war das Land jemals ein Natomitglied?
                                if (natoMetaData) {
                                    // Ist das Land an diesem Zeitpunkt ein Natomitglied?
                                    return +natoMetaData.year_of_accession <= d.value
                                        ? "#004990"
                                        : "#DDDDDD"
                                } else {
                                    return "#DDDDDD"
                                }
                            })
                        })

                })
        })
});
