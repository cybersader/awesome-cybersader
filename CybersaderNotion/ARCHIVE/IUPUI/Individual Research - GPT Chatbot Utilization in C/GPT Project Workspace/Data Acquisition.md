# Data Acquisition

# Folder and Data Hierarchy - using jobs

## Process

The Data Acquisition object uses a scrapy spider to traverse the URLs that are fed to it and process them.

The process:

- Data Acquisition object set:
    - Params:
        - job_id
        - URLs
        - output_dir
        - job_name
        - include_logs = True
        - Set log level - `DataAcquisitionSpider.custom_settings['LOG_LEVEL'] = scrapy_log_level`
        - Run - `data_acquisition.run()`
        
        ```python
        def test_data_acquisition(scrapy_log_level='INFO', include_logs=False):
            job_id = 1
            input_data = ['https://example.com/page1', 'https://example.com/page2','https://httpbin.org/status/200']
            output_dir = 'jobs'
            job_name = 'sample_job'
            data_acquisition = DataAcquisition(job_id, input_data=input_data, output_dir=output_dir,
                                               job_name=job_name, include_logs=include_logs)
            DataAcquisitionSpider.custom_settings['LOG_LEVEL'] = scrapy_log_level
            data_acquisition.run()
        ```
        

## Website Storage and Folder Hierarchy

- output_dir -  `jobs` folder
    - job_name - example: “sample_job”
        - `data` folder - holds the data obtained during job
            - File names - sub_job_id.txt
        - `logs` folder - holds the logs for sub_jobs (each URL)
            - File names - sub_job_id.log